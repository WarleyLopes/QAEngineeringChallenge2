import React from 'react';
import { MachineScore } from '../MachineScore';
import renderer from 'react-test-renderer';
import { MachineType, machineNames } from '../../data/types';

describe('MachineScore', () => {
  it('should render the machine name and score', () => {
    const machineName = MachineType.WeldingRobot;
    const score = '10';

    const tree = renderer.create(
      <MachineScore machineName={machineName} score={score} />
    );

    expect(
      tree.root.findByProps({ testID: 'ComponentMachineScoreText' }).props.children
    ).toBe(`${machineNames[machineName]}: ${score}`);
  });
});
