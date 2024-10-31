interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? 'visible bg-black/20' : 'invisible'}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white md:min-w-[800px] rounded-lg shadow p-6 transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  )
}
