export interface ElectiveOption {
  id: string;
  name: string;
  duration: string;
  dates: string[];
  instructor: string;
  city: string;
}

export interface ElectiveSelectionProps {
  onSubmit: (selection: ElectiveOption) => void;
}
