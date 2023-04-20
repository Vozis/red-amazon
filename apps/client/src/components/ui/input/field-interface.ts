import { InputHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  Icon?: IconType;
  error?: string;
}
