import React from 'react';
import { MachineScore } from '../MachineScore';
import renderer from 'react-test-renderer';

describe('MachineScore', () => {
  it('should render the machine name and score', () => {
    const machineName = 'Machine A';
    const score = '10';

    const tree = renderer.create(
      <MachineScore machineName={machineName} score={score} />
    );

    expect(
      tree.root.findByProps({ testID: 'ComponentMachineScoreText' }).props.children
    ).toBe('Machine A: 10');
  });
});
