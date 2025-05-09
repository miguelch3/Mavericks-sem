import { useRegisterBusinessStore } from '@mavericks/store';
import { MAX_HARDWARE_ITEMS } from '@mavericks/types';
import { Card, Flex, Select, Typography } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import { forwardRef } from 'react';

type Props = {
  name: string;
  description: string;
  pricing: string;
  value: Record<string, string>;
  onChange?: (value: Record<string, string>) => void;
};

export const HardwareOptionCard = forwardRef<HTMLDivElement, Props>(
  ({ name, description, pricing, value, onChange }, ref) => {
    const primaryColor = useRegisterBusinessStore((s) => s.primaryColor);

    const handleOptionChange = (selectedValue: number): void => {
      onChange?.({
        [name]: String(selectedValue),
      });
    };

    const deviceImageName = `${name.split(' ').join('_').toLowerCase()}`;
    const imageUrl = `/assets/${deviceImageName}.png`;
    const selectId = `${name.toLowerCase().replaceAll(' ', '-')}-qty-select`;

    return (
      <Card className="!my-1" ref={ref}>
        <Flex gap={20} className="flex-col xl:flex-row">
          <div className="flex justify-center rounded-md bg-slate-200 p-6">
            <Image src={imageUrl} width={150} height={150} alt={name} />
          </div>
          <Flex vertical justify="space-between" className="flex-1">
            <div>
              <Typography.Title
                level={4}
                className="!font-medium"
                style={{ color: primaryColor }}
              >
                {name}
              </Typography.Title>
              {description}
            </div>
            <Flex
              justify="space-between"
              gap={10}
              className="w-full flex-col xl:flex-row"
            >
              <Typography.Title
                level={5}
                className="!font-medium"
                style={{ color: primaryColor }}
              >
                {pricing}
              </Typography.Title>

              <div>
                <Select
                  data-cy={selectId}
                  className={classNames(selectId, 'min-w-32 w-full')}
                  size="large"
                  value={Number(value[name] || 0)}
                  onChange={handleOptionChange}
                >
                  <Select.Option key="option-no-item" value={0}>
                    <p className="text-sm">No Terminal</p>
                  </Select.Option>

                  {Array.from({ length: MAX_HARDWARE_ITEMS }).map(
                    (_, index) => {
                      const optionValue = index + 1;
                      return (
                        <Select.Option
                          key={`option-${optionValue}`}
                          value={optionValue}
                        >
                          {optionValue}
                        </Select.Option>
                      );
                    }
                  )}
                </Select>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }
);
