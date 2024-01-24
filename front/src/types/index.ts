export type Staff = {
  id: string;
  firstName: string;
  lastName: string;
};
export type Appointment = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  staff: Omit<Staff, "id">;
  client: {
    name: string;
  };
};

export type ElementList = {
  id: string;
  name: string;
};
