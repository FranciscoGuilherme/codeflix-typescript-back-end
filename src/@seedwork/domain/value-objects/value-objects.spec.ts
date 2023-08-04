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
      { vo: new StubValueObject(undefined), type: "undefined", content: undefined },
      { vo: new StubValueObject({ prop: 20 }), type: "object", content: { prop: 20 } },
      { vo: new StubValueObject("this is a test"), type: "string", content: "this is a test" }
    ];

    voList.forEach((item: VoListProperties): void => {
      const isValid: boolean = typeof item.vo.value === item.type;
      expect(isValid).toBeTruthy();
      expect(item.vo.value).toStrictEqual(item.content);
    });
  });
});
