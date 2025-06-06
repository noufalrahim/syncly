import React from 'react';

export type btn = {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
};

export type AppBarProps = {
  title: string;
  description: string;
  buttons?: btn[];
};
