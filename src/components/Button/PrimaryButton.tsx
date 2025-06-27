import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button'
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
    label: string,
    className?: string,
    onClick?: () => void;
    loading?: boolean;
    startIcon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function PrimaryButton({
    label,
    className,
    onClick,
    loading,
    startIcon,
    type = 'button',
    disabled = false
}: PrimaryButtonProps) {
    return (
        <Button variant={'default'} disabled={disabled} className={cn('w-full bg-blue-500 text-white hover:bg-blue-500/80', className)} onClick={(event) => {
            event.stopPropagation();
            if(onClick) {
                onClick()
            }
        }} type={type}>
            {
                loading ? (
                    <div className='items-center flex flex-row gap-2'>
                        <Loader2 className="animate-spin" />
                        <p>Loading</p>
                    </div>
                ) : (
                    <div className='flex items-center justify-center flex-row gap-2'>
                        {startIcon && startIcon}
                        {label}
                    </div>
                )
            }
        </Button>
    )
}
