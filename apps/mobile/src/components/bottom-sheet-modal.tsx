import { ReactNode, forwardRef } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';

import { TouchableOpacity } from '@leather.io/ui/native';

const absoluteStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
} satisfies ViewStyle;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function Backdrop({ animatedIndex }: BottomSheetBackdropProps) {
  const { close } = useBottomSheet();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, -0.5], [0, 0.3], Extrapolation.CLAMP),
  }));

  const animatedProps = useAnimatedProps(() => {
    const intensity = interpolate(animatedIndex.value, [-1, -0.5], [0, 15], Extrapolation.CLAMP);
    return {
      intensity,
    };
  });

  return (
    <AnimatedBlurView
      animatedProps={animatedProps}
      tint="systemChromeMaterial"
      style={[
        {
          width: '100%',
          justifyContent: 'center',
        },
        absoluteStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            backgroundColor: 'black',
          },
          absoluteStyle,
          animatedStyle,
        ]}
      >
        <TouchableOpacity onPress={() => close()} style={{ flex: 1 }} />
      </Animated.View>
    </AnimatedBlurView>
  );
}

export const Modal = forwardRef<BottomSheetModal, { children: ReactNode }>(function (
  { children },
  ref
) {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      enableDynamicSizing
      ref={ref}
      enablePanDownToClose
      backdropComponent={Backdrop}
    >
      <BottomSheetView
        style={{
          paddingBottom: bottom,
          paddingHorizontal: 24,
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});