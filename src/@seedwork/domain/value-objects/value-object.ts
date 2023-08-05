import { deepFreeze } from "@seedwork/domain/utils/object";

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  protected constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  get value(): Value {
    return this._value;
  }

  toString: () => string = (): string => {
    if (typeof this.value === "object" && !(this.value instanceof Date)) {
      return JSON.stringify(this.value);
    }

    return this.value.toString();
  };
}
