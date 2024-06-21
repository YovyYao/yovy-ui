import type { Component, ComputedRef, Ref } from "vue";

export type ButtonType = "primary" |	"success" |	"warning" |	"danger" | "info"
export type NativeType = "button" |	"reset" |	"submit"
export type ButtonSize = "large" | "default" | "small"

// YoButton实例对象的props属性
export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  icon?: string;
  circle?: boolean;
  plain?: boolean;
  round?: boolean;
  autofocus?: boolean;
  useThrottle?: boolean;
  throttleDuration?: number;
}

// YoButton触发的事件
export interface ButtonEmits {
  (e: 'click', val: MouseEvent): void
}

// YoButton的组件实例
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ButtonSize | "">
  type: ComputedRef<ButtonType | "">
}

// YoButtonGroup的props属性
export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

// YoButtonGroup的组件实例
export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}