import { Select, SelectProps } from "antd";
import { useTags } from "@/app/hooks/useTags";

export const TagSelect = (props: SelectProps<string[]>) => {
  const { value, ...restProps } = props;
  const { options, loading } = useTags();

  return (
    <Select
      allowClear
      loading={loading}
      value={value}
      options={options}
      mode="tags"
      {...restProps}
    />
  );
};
