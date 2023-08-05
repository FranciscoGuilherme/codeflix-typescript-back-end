import ValueObject from "@seedwork/domain/value-objects/value-object";

class StubValueObject extends ValueObject {
  constructor(value: any) {
    super(value);
  }
}

describe("Unit tests for abstract value object class", (): void => {
  it("should set value", (): void => {
    type VoListProperties = { vo: StubValueObject; type: string, content: any };
    const voList: VoListProperties[] = [
      { vo: new StubValueObject(100), type: "number", content: 100 },
      { vo: new StubValueObject({ prop: 20 }), type: "object", content: { prop: 20 } },
      { vo: new StubValueObject("this is a test"), type: "string", content: "this is a test" }
    ];

    voList.forEach((item: VoListProperties): void => {
      const isValid: boolean = typeof item.vo.value === item.type;
      expect(isValid).toBeTruthy();
      expect(item.vo.value).toStrictEqual(item.content);
    });
  });

  it("should convert a bunch of values to string successfully", ():void => {
    const date: Date = new Date();
    type VoListProperties = { vo: StubValueObject; expect: string };
    const voList: VoListProperties[] = [
      { vo: new StubValueObject(-1), expect: "-1" },
      { vo: new StubValueObject(100), expect: "100" },
      { vo: new StubValueObject(date), expect: date.toString() },
      { vo: new StubValueObject({ prop: 20 }), expect: "{\"prop\":20}" },
      { vo: new StubValueObject("this is a test"), expect: "this is a test" }
    ];

    voList.forEach((item: VoListProperties): void => {
      expect(item.vo.toString()).toBe(item.expect);
    });
  });

  it("should be immutable", (): void => {
    const vo: StubValueObject = new StubValueObject({ prop: "value", nested: { prop: "test" } });

    expect((): void => { vo.value.prop = "change"; }).toThrowError();
    expect((): void => {
      vo.value.nested.prop = "change";
    }).toThrowError();
  });
});
