import { forwardRef, ForwardRefRenderFunction, useEffect } from 'react';
import { FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form';
import { FormControl, FormErrorMessage, Icon, Input as ChakraInput, InputProps as ChakraInputProps, Tooltip } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldErrors;
  setError: UseFormSetError<FieldValues>;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, error = null, setError, ...rest }, ref) => {
  useEffect(() => {
    if (error?.[name]?.message) {
      setError(name, null);
    }
  }, [error, setError, name]);
  return (
    <FormControl display="flex" flexDirection="row" alignItems="center" isInvalid={Object.keys(error).length > 0}>
      <ChakraInput
        aria-label={name}
        name={name}
        ref={ref}
        borderColor="transparent"
        bgColor="pGray.800"
        color="pGray.50"
        _placeholder={{
          color: 'pGray.200',
        }}
        _hover={{
          borderColor: 'orange.400',
        }}
        py={6}
        pr={8}
        {...rest}
      />

      {error?.[name]?.message && (
        <Tooltip label={error?.[name]?.message} bg="red.500">
          <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
            <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
          </FormErrorMessage>
        </Tooltip>
      )}
    </FormControl>
  );
};

export const TextInput = forwardRef(TextInputBase);
