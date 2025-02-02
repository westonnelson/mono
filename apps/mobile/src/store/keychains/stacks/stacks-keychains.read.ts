import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { selectNetworkPreference } from '@/store/settings/settings.read';
import { mnemonicStore } from '@/store/storage-persistors';
import { createSelector } from '@reduxjs/toolkit';

import { decomposeDescriptor } from '@leather.io/crypto';
import {
  createSignFnFromMnemonic,
  initalizeStacksSigner,
  stacksChainIdToCoreNetworkMode,
} from '@leather.io/stacks';

import { descriptorKeychainSelectors, filterKeychainsByStacksAccount } from '../keychains';
import { adapter } from './stacks-keychains.write';

export const stacksKeychainSelectors = adapter.getSelectors(
  (state: RootState) => state.keychains.stacks
);

function createSignFnFromBiometricMnemonicStore(descriptor: string) {
  const { keyOrigin, fingerprint } = decomposeDescriptor(descriptor);
  return createSignFnFromMnemonic(keyOrigin, () => mnemonicStore(fingerprint).getMnemonic());
}

const stacksSigners = createSelector(
  stacksKeychainSelectors.selectAll,
  selectNetworkPreference,
  (accounts, network) =>
    accounts.map(account =>
      initalizeStacksSigner({
        descriptor: account.descriptor,
        network: stacksChainIdToCoreNetworkMode(network.chain.stacks.chainId),
        signFn: createSignFnFromBiometricMnemonicStore(account.descriptor),
      })
    )
);

export function useStacksSigners() {
  const list = useSelector(stacksSigners);
  return useMemo(
    () => ({ ...descriptorKeychainSelectors(list, filterKeychainsByStacksAccount) }),
    [list]
  );
}

export function useStacksSignerAddresses() {
  return useStacksSigners().list.map(signer => signer.address);
}

export function useStacksSignerAddressFromAccountIndex(fingerprint: string, accountIndex: number) {
  const signers = useStacksSigners().fromAccountIndex(fingerprint, accountIndex);
  return signers.map(signer => signer.address)[0];
}
