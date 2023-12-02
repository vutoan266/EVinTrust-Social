import { Select, SelectProps } from "antd";
import { useTags } from "@/app/hooks/useTags";

export const TagSelect = (props: SelectProps<string[]>) => {
  const { value, ...restProps } = props;
  const { tags, loading } = useTags();

  return (
    <Select
      allowClear
      loading={loading}
      value={value}
      options={tags?.map((tag) => ({ label: tag.name, value: tag.name }))}
      mode="tags"
      {...restProps}
    />
  );
};
