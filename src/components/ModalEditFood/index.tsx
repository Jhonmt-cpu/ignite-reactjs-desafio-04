import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FormHandles, SubmitHandler } from '@unform/core';
import { FoodData } from '../Food';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodData;
  handleUpdateFood: (food: FoodData) => void;
}

interface FormData {
  name: string;
  image: string;
  price: string;
  description: string;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const dataWithPriceInNumber = Object.assign(data, {
      price: Number(data.price),
      id: editingFood.id,
      available: editingFood.available,
    })

    handleUpdateFood(dataWithPriceInNumber);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
