import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 25%;
  overflow: scroll;
  background: #f9f9f9;
  border: 5px solid #0084ff40;
  border-radius: 10px;
  padding: 20px;
  width: 100vh;
  height : 80vh;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px;
  width: 47%;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background : #f1f1f1;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background: #f1f1f1;
  }
`;

const TableHeader = styled.th`
  background: #ffffff;
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const MetricBox = styled.div`
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 10px;
  width: 30%;
  text-align: center;
`;

const MetricTitle = styled.h3`
  font-size: 16px;
  border: 1px solid;
  color: #333;
  margin-bottom: 10px;
`;

const MetricValue = styled.p`
  font-size: 14px;
  color: ${props => props.color || '#333'};
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
`;

const BarSegment = styled.div`
  height: 100%;
  transition: width 0.3s ease-in-out;
  background: ${props => props.color || '#007bff'};
  width: ${props => props.percent || 0}%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const BarBox = styled.div`
  width: 22%;
  text-align: center;
  margin-bottom: 20px;
`;

const BarLabel = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Bar = styled.div`
  background: ${props => props.color || '#007bff'};
  height: 20px;
  border-radius: 10px;
  width: ${props => props.percent || 0}%;
  transition: width 0.3s ease-in-out;
`;

const BarValue = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const DiagnosticComponent = () => {
  const [data, setData] = useState(null);
  const [percent, setPercent] = useState({
    doubleLegSupport: 16.3,
    rightSingleLegSupport: 40.5,
    doubleSupport: 3.6,
    leftSingleLegSupport: 39.8,
    rightStance: 60.4,
    rightSwing: 39.4,
    leftSwing: 40,
    leftStance: 59.9,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patient/1'); // API 호출
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { personalInfo, gaitBasic, gaitCycleSample, gaitCyclePhase, gaitCycleTime, gaitAssess } = data;

  return (
    <Container>
      <Header>
        <InfoBox>
          <Title>환자 정보</Title>
          {personalInfo.map(info => (
            <div key={info.call_id}>
              <p>이름: {info.name}</p>
              <p>나이: {info.age}</p>
              <p>키: {info.height} cm</p>
              <p>몸무게: {info.weight} kg</p>
              <p>성별: {info.gender}</p>
            </div>
          ))}
        </InfoBox>
        <InfoBox>
          <Title>Walking Info</Title>
          {gaitBasic.map((info, index) => (
            <p key={index}>{info.category}: {info.value} {info.unit}</p>
          ))}
        </InfoBox>
      </Header>

      <Text>보행 주기 결과</Text>

      <Content>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>항목</TableHeader>
              <TableHeader>단위</TableHeader>
              <TableHeader>왼발</TableHeader>
              <TableHeader>오른발</TableHeader>
              <TableHeader>차이</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {gaitCyclePhase.map((phase, index) => (
              <TableRow key={index}>
                <TableData>{phase.category}</TableData>
                <TableData>{phase.unit}</TableData>
                <TableData>{phase.left_mean} ± {phase.left_sd}</TableData>
                <TableData>{phase.right_mean} ± {phase.right_sd}</TableData>
                <TableData>{phase.diff_mean} ± {phase.diff_sd}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Content>

      <Text>시간적 정보</Text>

      <Content>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>항목</TableHeader>
              <TableHeader>단위</TableHeader>
              <TableHeader>왼발</TableHeader>
              <TableHeader>오른발</TableHeader>
              <TableHeader>차이</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {gaitCycleTime.map((time, index) => (
              <TableRow key={index}>
                <TableData>{time.category}</TableData>
                <TableData>{time.unit}</TableData>
                <TableData>{time.left_mean} ± {time.left_sd}</TableData>
                <TableData>{time.right_mean} ± {time.right_sd}</TableData>
                <TableData>{time.diff_mean} ± {time.diff_sd}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Content>

      <MetricsContainer>
        {gaitAssess.map((assess, index) => (
          <MetricBox key={index}>
            <MetricTitle>{assess.category}</MetricTitle>
            <MetricValue color={assess.left < 0 ? 'red' : undefined}>왼발: {assess.left}</MetricValue>
            <MetricValue color={assess.right < 0 ? 'red' : undefined}>오른발: {assess.right}</MetricValue>
            <MetricValue color={assess.result.includes('불안정') || assess.result.includes('불규칙') ? 'red' : undefined}>
              {assess.result}
            </MetricValue>
          </MetricBox>
        ))}
      </MetricsContainer>

      <BarContainer>
        <BarSegment color="#d4aaf4" percent={percent.doubleLegSupport}>
          양다리 지지기/
          {percent.doubleLegSupport}%
        </BarSegment>
        <BarSegment color="#aea8f4" percent={percent.rightSingleLegSupport}>
          오른쪽 한 다리 지지기 {percent.rightSingleLegSupport}%
        </BarSegment>
        <BarSegment color="#b4b5f5" percent={percent.doubleSupport}>
          양다리 지지기 {percent.doubleSupport}%
        </BarSegment>
        <BarSegment color="#c4c3f5" percent={percent.leftSingleLegSupport}>
          왼쪽 한 다리 지지기 {percent.leftSingleLegSupport}%
        </BarSegment>
      </BarContainer>

      <BarContainer>
        <BarSegment color="#d4aaf4" percent={percent.rightStance}>
          오른쪽 디딤기 {percent.rightStance}%
        </BarSegment>
        <BarSegment color="#aea8f4" percent={percent.rightSwing}>
          오른쪽 흔들기 {percent.rightSwing}%
        </BarSegment>
      </BarContainer>

      <BarContainer>
        <BarSegment color="#b4b5f5" percent={percent.leftSwing}>
          왼쪽 흔들기 {percent.leftSwing}%
        </BarSegment>
        <BarSegment color="#c4c3f5" percent={percent.leftStance}>
          왼쪽 디딤기 {percent.leftStance}%
        </BarSegment>
      </BarContainer>

      <Footer>
        <Button>과거 기록과 비교하기</Button>
        <Button>닫기</Button>
      </Footer>
    </Container>
  );
};

export default DiagnosticComponent;
