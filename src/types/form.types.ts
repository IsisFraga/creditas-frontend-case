export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type FormValidations<T> = {
  [K in keyof T]?: (value: T[K], formData?: T) => string | undefined;
};

export type FormMasking<T> = {
  [K in keyof T]?: (value: T[K], formData?: T) => string;
};

export type FormMethods<T> = {
  handleFormChange: <K extends keyof T>(key: K, value: T[K]) => void;
  handleSubmit: () => Promise<void>;
  handleReset: () => void;
  handleClearError: <K extends keyof T>(key: K) => void;
};
