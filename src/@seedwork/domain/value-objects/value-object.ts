export default abstract class ValueObject<Value = any> {
  protected _value: Value;

  protected constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  toString = (): string => {
    if (this.value === null) {
      return "null";
    }

    if (typeof this.value === "object" && !(this.value instanceof Date)) {
      return JSON.stringify(this.value);
    }

    try {
      return this.value.toString();
    } catch (e) {
      return `${this.value}`;
    }
  };
}
