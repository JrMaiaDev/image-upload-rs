import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface FormAddImage {
  title: string;
  description: string;
  url: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: file => {
          if (file[0].size > 10000000) {
            return 'O arquivo deve ser menor que 10MB';
          }
          return true;
        },
        acceptedFormats: file => {
          if (file[0].type.match(/(gif|jpe?g|png)$/i)) {
            return true;
          }
          return 'Somente são aceitos arquivos PNG, JPEG e GIF';
        },
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Título obrigatório',
      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLength: { value: 20, message: 'Máximo de 20 caracteres' },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição obrigatória',
      maxLength: { value: 65, message: 'Máximo de 65 caracteres' },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (formData: FormAddImage) => {
      const response = await api.post('/api/images', {
        title: formData.title,
        description: formData.description,
        url: imageUrl,
      });
      return response.data;
    },
    // TODO ONSUCCESS MUTATION
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: FormAddImage): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({ title: 'Imagem não adicionada', description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.', status: 'error', duration: 5000, isClosable: true });
        return;
      }
      // TODO EXECUTE ASYNC MUTATION
      const result = await mutation.mutateAsync(data);
      // TODO SHOW SUCCESS TOAST
      if (result?.success === true) {
        toast({ title: 'Imagem cadastrada', description: 'Sua imagem foi cadastrada com sucesso.', status: 'error', duration: 5000, isClosable: true });
      }
    } catch (e) {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({ title: e.message, description: e.message, status: 'error', duration: 5000, isClosable: true });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          error={errors}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          setError={setError}
          error={errors}
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          setError={setError}
          error={errors}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button my={6} isLoading={formState.isSubmitting} isDisabled={formState.isSubmitting} type="submit" w="100%" py={6}>
        Enviar
      </Button>
    </Box>
  );
}
