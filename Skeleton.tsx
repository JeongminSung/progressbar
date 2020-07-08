import { Animated, StyleProp, ViewStyle } from "react-native";
import React, { FC, useEffect } from "react";

import styled from "styled-components/native";

export interface Props {
  variant?: "text" | "circle" | "rect";
  width?: number | string;
  height?: number | string;
  color?: string;
  animation?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface VariantProps {
  borderRadius: number | string;
}

const handleVariant = (
  variant: string | undefined
): VariantProps | undefined => {
  if (variant === "text") {
    return { borderRadius: 10 };
  }
  if (variant === "rect") {
    //   return { borderRadius: 0 };
  }
  if (variant === "circle") {
    return { borderRadius: "50%" };
  }
  return undefined;
};

const Skeleton: FC<Props> = ({
  //function component
  variant,
  width,
  height,
  color,
  animation,
  children,
  style,
}) => {
  const opacity = new Animated.Value(0.3);

  useEffect((): void => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  return (
    // <Skeletons
    //   as={Animated.View}
    //   style={[
    //     { width },
    //     { height },
    //     { backgroundColor: color },
    //     handleVariant(variant),
    //     animation ? { opacity } : undefined,
    //     children
    //       ? {
    //           height: children.height,
    //           width: children.width,
    //         }
    //       : undefined,
    //     style,
    //   ]}>
    //   {children}
    // </Skeletons>
    <Skeletons
      as={Animated.View}
      style={[
        { width },
        { height },
        handleVariant(variant),
        animation ? { opacity } : undefined,
        //children 속성 뭔가 이상함.. width, height 받지 않는 방법 생각해보기
        //reactNode가 뭘지 생각하기
        children
          ? {
              width: (children as React.ReactChildren).width,
              height: children.height,
            }
          : undefined,
        { backgroundColor: color },
        style,
      ]}
    >
      {children}
    </Skeletons>
  );
};

export default Skeleton;

Skeleton.defaultProps = {
  variant: "text",
  width: 300,
  height: 20,
  color: "#e7e7e7",
  animation: true,
};

const Skeletons = styled.View`
  background-color: lightgray;
`;
