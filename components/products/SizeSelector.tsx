import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { ISize } from '@/interfaces';

interface Props {
    selectedSize?: ISize;
    size?: ISize;
  
    // Method
    onSelectedSize: (size: ISize) => void;
  }

export const SizeSelector: FC<Props> = ({ selectedSize,  size, onSelectedSize}) => {
  console.log(size)
  return (
    <Box>

        <Button
          key={size}
         
          color={ 'primary' }
          // color={selectedSize === size ? 'primary' : 'info'}
          // onClick={() => onSelectedSize(size)} 
        >
          {size}
        </Button>
      

      
    
  </Box>
  )
}
