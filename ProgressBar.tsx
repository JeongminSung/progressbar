import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";

/**
 * react css property라는게 잇음 이거로는 css를 인터페이스화 할 수 있음
 * api데이터를 받아올 때도 타입 지정 다 해줘야함...^^
 * as : 타입을 강제함.
 * 변수를 사용할 때
 * Interface State{
 * name: string
 * }
 * {name} = this.state as State
 * 얘는 무조건 State일 떄. 타입에러가 나는데 어떻게 할 지 모르겠다 할 때 사용.
 * 별로 권장하지는 않음
 *
 * 이벤트도 타입을 지정해줘야함
 *
 * 인터페이스도 뎊스가 깊다는것을 이해해야함
 */
export interface Props {
  borderRadius?: number | undefined;
  bgColor?: string | undefined;
  progress?: number | undefined;
  animation?: boolean | undefined;
  label?: boolean | undefined;
  determinate?: boolean | undefined;
}

//초기 value세팅 오퍼시티 0으로

const ProgressBar = (props: Props) => {
  const { bgColor, progress, borderRadius, label, determinate } = props;

  return (
    <Container>
      <ProgressBars borderRadius={borderRadius}>
        <DeterminatedFiller
          // animation ? {fadeAnim} : undefined
          bgColor={bgColor}
          progress={progress}
          borderRadius={borderRadius}
          determinate={determinate}
        ></DeterminatedFiller>
        {/* <IndeterminatedFiller>
          bgColor={bgColor}
          progress={progress}
          borderRadius={borderRadius}
          determinate={determinate}
        </IndeterminatedFiller> */}
      </ProgressBars>
      <Label label={label}>{`${progress}%`}</Label>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  flex: 1;
  padding: 20px 10px;
`;

const ProgressBars = styled.View<{ borderRadius: number | undefined }>`
  height: 10px;
  background-color: #d0e3ff;
  border-radius: ${({ borderRadius }) => borderRadius};
  flex: 1;
`;

const DeterminatedFiller = styled.View<{
  progress: number | undefined;
  bgColor: string | undefined;
  borderRadius: number | undefined;
  determinate: boolean | undefined;
}>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ bgColor }) => bgColor};
  justify-content: center;
  border-radius: ${({ borderRadius }) => borderRadius};
  display: ${({ determinate }) => (determinate === true ? "flex" : "none")};
`;

const IndeterminatedFiller = styled.View<{
  progress: number | undefined;
  bgColor: string | undefined;
  borderRadius: number | undefined;
  determinate: boolean | undefined;
}>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${({ bgColor }) => bgColor};
  justify-content: center;
  border-radius: ${({ borderRadius }) => borderRadius};
  display: ${({ determinate }) => (determinate === false ? "flex" : "none")};
`;

const Label = styled.Text<{ label: boolean | undefined }>`
  color: #000;
  font-weight: bold;
  font-size: 9px;
  margin-left: 5px;
  display: ${({ label }) => (label === true ? "flex" : "none")};
`;

ProgressBar.defaultProps = {
  borderRadius: 0,
  bgColor: "#609FFF",
  progress: "0",
  label: "false",
};
