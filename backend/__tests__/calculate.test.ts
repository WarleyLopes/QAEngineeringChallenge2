import { calculatePartHealth, calculateMachineHealth } from "../calculations";
import {
  MachineType,
  QualityControlStationPart,
  WeldingRobotPart,
  partInfo,
} from "../../native-app/data/types";

import machineData from "../../native-app/data/machineData.json";

describe("calculatePartHealth", () => {
  it("should return 72.22...3 when part quality 0.5 and normal range 0.1~1", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 0.5 };
    const expectedHealth = 72.22222222222223;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return 100 when part quality 1 and normal range 0.1~1", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 1 };
    const expectedHealth = 100;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return 0 when part quality 1.1 compared to normal range 0.1~1", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 1.1 };
    const expectedHealth = 50;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return 0 when part quality 1.1 compared to normal range 0.1~1", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 1.1 };
    const expectedHealth = 50;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return 100 when part value is at minimum of optimal range [0.0~0.1]", () => {
    const machineName: MachineType = MachineType.WeldingRobot;

    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 0.0 };
    const expectedHealth = 100;

    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return 100 when part value is at maximum of optimal range and equals minimum of normal range", () => {
    //Could also dynamically try to find this machine and part in machineData.json
    const machineName: MachineType = MachineType.WeldingRobot;
    const part: partInfo = { name: WeldingRobotPart.ErrorRate, value: 0.1 };
    const expectedHealth = 100;
    const minNormalRange =
      machineData[machineName][WeldingRobotPart.ErrorRate].normalRange[0];
    const maxOptimalRange =
      machineData[machineName][WeldingRobotPart.ErrorRate].optimalRange[1];
    const isMinNormalRangeSameAsMaxOptimalRange =
      minNormalRange === maxOptimalRange;

    if (isMinNormalRangeSameAsMaxOptimalRange) {
      const result = calculatePartHealth(machineName, part);
      expect(result).toBe(expectedHealth);
    } else {
      console.log(
        "Test skipped because minNormalRange is not equal to maxOptimalRange in machineData.json"
      );
    }
  });

  it("should return health 100 when part optimal range is [0, 0] and normal range is [0, >0] and part quality is 0", () => {
    // More context on this test given below
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = {
      name: QualityControlStationPart.CriteriaSettings,
      value: 0,
    };
    const expectedHealth = 100;
    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return health 100 within optimal and normal range of a part with string value", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = {
      name: QualityControlStationPart.SoftwareVersion,
      //In this case, the value here should be "v1.0" based on machineData.json
      //But typescript won't allow it as the definition of the partInfo value is a number and not number | string
      //Another particularity that I would be looking into with the team to determine whether we should fix in code, data, or
      //In the way that the value is used
      value: 1.0,
    };
    const expectedHealth = 100;
    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should return health 100 within optimal and normal range of a part with string value", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = {
      name: QualityControlStationPart.SoftwareVersion,
      //Same as above, the value here should be "v2.0" based on machineData.json
      value: 2.0,
    };
    const expectedHealth = 100;
    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should not return health 0 when above normal range or below lowest of normal or optimal", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = {
      name: QualityControlStationPart.SoftwareVersion,
      //Same as above, the value here should be "v2.1" based on machineData.json
      value: 2.1,
    };
    const expectedHealth = 100;
    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });

  it("should not return health 0 when above normal range or below lowest of normal or optimal", () => {
    const machineName: MachineType = MachineType.QualityControlStation;
    const part: partInfo = {
      name: QualityControlStationPart.SoftwareVersion,
      //Same as above, the value here should be "v0.9" based on machineData.json
      value: 0.9,
    };
    const expectedHealth = 100;
    const result = calculatePartHealth(machineName, part);
    expect(result).toBe(expectedHealth);
  });
});

describe("calculateMachineHealth", () => {
  it("should return 76.70138...9 based on a combination of parts and respective particular qualities", () => {
    const machineName: MachineType = MachineType.WeldingRobot;
    const parts = [
      { name: WeldingRobotPart.ErrorRate, value: 0.5 },
      { name: WeldingRobotPart.VibrationLevel, value: 4.0 },
      { name: WeldingRobotPart.ElectrodeWear, value: 0.8 },
      { name: WeldingRobotPart.ShieldingPressure, value: 12.0 },
      { name: WeldingRobotPart.WireFeedRate, value: 7.5 },
      { name: WeldingRobotPart.ArcStability, value: 92.0 },
      { name: WeldingRobotPart.SeamWidth, value: 1.5 },
      { name: WeldingRobotPart.CoolingEfficiency, value: 85.0 },
    ];
    const expectedHealth = 76.70138888888889;

    const result = calculateMachineHealth(machineName, parts);
    expect(result).toBe(expectedHealth);
  });

  it("should return health 100 when machine with part optimal range is [0, 0] and normal range is [0, >0] but part quality is at 0", () => {
    // Generating a dynamic test suite using data from ../../native-app/data/machineData.json
    // Where we have test cases to check for the min, middle, and max value in each range (normal, abnormal, optimal)
    // I came up to the realization that we have issues that initially could only be data issues from the machineData.json file
    // When the optimal range is [0, 0] and normal range is [0, >0], it would be expected that a
    // machine with a part with value of 0 would have a health score of 100, but we get a health score of 50 instead of 100
    // Likely because the maximum and minimum are the same
    const machineName: MachineType = MachineType.QualityControlStation;
    const parts = [
      { name: QualityControlStationPart.CriteriaSettings, value: 0 },
    ];
    // Conditional check to see if both values in
    // machineData[MachineType.QualityControlStation][QualityControlStationPart.CriteriaSettings].optimalRange are 0
    // To either skip the test or run the test
    const { optimalRange } =
      machineData[MachineType.QualityControlStation][
        QualityControlStationPart.CriteriaSettings
      ];
    const isMin0Max0OptimalRange =
      optimalRange[0] === 0 && optimalRange[1] === 0;
    if (isMin0Max0OptimalRange) {
      const expectedHealth = 100;
      const result = calculateMachineHealth(machineName, parts);
      expect(result).toBe(expectedHealth);
    } else {
      console.log(
        "Test skipped because optimal range is not [0, 0] in machine-data.json"
      );
    }
    // Additionally, I could programatically try to find the machine and part with the optimal range of [0, 0]
    // Instead of fixing it to QualityControlStation and CriteriaSettings
  });

  // TODO: More  tests validating overall machine health score
  // with different combinations of parts and respective qualities

  // TODO: More tests validating overall factory health score
  // with different combinations of machines, parts, and respective qualities

  // TODO: More tests validating machine/parts that do not exist in machineData.json

  // TODO: More tests validating extreme minimum and maximum values of qualities

  // TODO: More tests around different types of values for parts (string, number, etc.)
  // and how the API requests are handled on those cases
});
