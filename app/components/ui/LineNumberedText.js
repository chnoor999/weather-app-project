import { Pressable, StyleSheet } from "react-native";
import { memo, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

const LineNumberedText = ({ delay, children, ...props }) => {
  const [numberOfLines, setNumberOfLines] = useState(1);

  return (
    <Pressable onPress={() => setNumberOfLines((pre) => (pre == 1 ? null : 1))}>
      <Animated.Text
        entering={delay && FadeInDown.delay(delay)}
        {...props}
        numberOfLines={numberOfLines}
      >
        {children}
      </Animated.Text>
    </Pressable>
  );
};

export default memo(LineNumberedText);

const styles = StyleSheet.create({});
