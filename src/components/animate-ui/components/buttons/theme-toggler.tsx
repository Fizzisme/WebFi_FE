'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon } from '@/components/animate-ui/icons/moon';
import { Sun } from '@/components/animate-ui/icons/sun';
import { VariantProps } from 'class-variance-authority';

import {
    ThemeToggler as ThemeTogglerPrimitive,
    type ThemeTogglerProps as ThemeTogglerPrimitiveProps,
    type ThemeSelection,
    type Resolved,
} from '@/components/animate-ui/primitives/effects/theme-toggler';

import { buttonVariants } from '@/components/animate-ui/components/buttons/icon';



const getNextTheme = (theme: ThemeSelection): ThemeSelection => {
    return theme === 'dark' ? 'light' : 'dark';
};

type ThemeTogglerButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
    onImmediateChange?: ThemeTogglerPrimitiveProps['onImmediateChange'];
    direction?: ThemeTogglerPrimitiveProps['direction'];
};

function ThemeTogglerButton({
                                direction = 'ltr',
                                onImmediateChange,
                            }: ThemeTogglerButtonProps) {
    const { theme, resolvedTheme, setTheme } = useTheme();

    return (
        <ThemeTogglerPrimitive
            theme={theme as ThemeSelection}
            resolvedTheme={resolvedTheme as Resolved}
            setTheme={setTheme}
            direction={direction}
            onImmediateChange={onImmediateChange}
        >
            {({ effective, toggleTheme }) => (

                <div>
                    {effective === 'dark' ? <Moon animateOnHover data-slot="theme-toggler-button"
                                                  className='size-5'
                                                  onClick={() => {
                                                      toggleTheme(getNextTheme(effective));
                                                  }}
                                                /> : <Sun animateOnHover data-slot="theme-toggler-button"
                                                                      className='size-5'
                                                                      onClick={() => {
                                                                          toggleTheme(getNextTheme(effective));
                                                                      }}
                                                                      />}
                </div>
            )}
        </ThemeTogglerPrimitive>
    );
}

export { ThemeTogglerButton, type ThemeTogglerButtonProps };
