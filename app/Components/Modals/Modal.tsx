"use client"
import { useGlobalState } from '@/app/Context/GlobalContextProvider';
import React from 'react'

interface Props {
  content: React.ReactNode
}

const Modal = ({ content }: Props) => {
  const { closeModal } = useGlobalState();
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-screen z-50 bg-[#00000073] blur-sm"
        onClick={() => {
          closeModal;
        }}
      ></div>
      <div className="p-8 relative max-w-[630px] w-full z-[100] rounded-2xl bg-[#212121] shadow-[0_0_1rem_rgba(0,0,0,0.3)]">
        {content}
      </div>
    </div>
  );
}

export default Modal