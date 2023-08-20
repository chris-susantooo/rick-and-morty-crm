import { ChevronDown } from 'lucide-react';
import {
  ChangeEventHandler,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMergeRefs } from 'rooks';
import { cn } from 'utils';
import Button, { ButtonProps } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import Input from './Input';
import { Small } from './Typography';

interface Props extends Omit<ButtonProps, 'onChange'> {
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  items: Item[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
}

export interface Item {
  label: string;
  value: string;
}

const PillSelect = forwardRef<HTMLButtonElement, Props>(
  (
    {
      name,
      value,
      defaultValue,
      className,
      placeholder,
      items,
      onChange,
      inputRef,
      ...rest
    },
    ref
  ) => {
    const getLabel = useCallback(
      () =>
        items.find(item => item.value === defaultValue || value)?.label ||
        placeholder,
      [defaultValue, items, placeholder, value]
    );

    const [label, setLabel] = useState(getLabel);
    const localInputRef = useRef<HTMLInputElement>(null);

    const handleItemClick = (selectedItem: Item) => () => {
      const input = localInputRef.current;
      if (input) {
        setLabel(selectedItem.label);
        const nativeValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeValueSetter?.call(input, selectedItem.value);
        localInputRef.current.dispatchEvent(
          new Event('input', { bubbles: true })
        );
      }
    };

    useEffect(() => {
      setLabel(getLabel());
    }, [getLabel]);

    return (
      <>
        <Input
          ref={useMergeRefs(localInputRef, inputRef)}
          name={name}
          defaultValue={defaultValue}
          value={value}
          className="hidden"
          onChange={onChange}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={cn('gap-1', className)}
              ref={ref}
              variant="pill"
              size="xs"
              {...rest}
            >
              <Small>{label}</Small>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel>{placeholder}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {items.map(item => (
                <DropdownMenuItem
                  key={item.label}
                  className="cursor-pointer"
                  onClick={handleItemClick(item)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
);

export default PillSelect;
