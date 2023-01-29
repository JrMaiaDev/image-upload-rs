import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onClose, isOpen, onOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imgUrl, setImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleImageUrl(url: string): void {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      {
        /* TODO CARD GRID */
        <SimpleGrid gridTemplateColumns="repeat(3, 1fr)" gap={10} borderBottom={40}>
          {cards?.map(image => (
            // eslint-disable-next-line react/jsx-no-bind
            <Card data={image} key={image.ts} viewImage={handleImageUrl} />
          ))}
        </SimpleGrid>
      }

      {/* TODO MODALVIEWIMAGE */}
      {isOpen && <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />}
    </>
  );
}
