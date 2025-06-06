import { cn } from '@/lib/utils';
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react';

interface SecondaryButtonProps {
    label: string,
    className?: string,
    onClick?: () => void;
    loading?: boolean;
    startIcon?: React.ReactNode;
    disabled?: boolean;
}

export default function SecondaryButton({
    label,
    className,
    onClick,
    loading,
    startIcon,
    disabled = false
}: SecondaryButtonProps) {
    return (
        <Button variant={'outline'} disabled={disabled} className={cn('w-full text-primary-main border-primary-main hover:bg-primary-main/10 hover:text-primary-main', className)} onClick={(event) => {
            event.stopPropagation();
            if(onClick) {
                onClick()
            }
        }}>
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
