// src/components/agenda/AgendaBlock.jsx
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import './AgendaBlock.css';
import { Block } from '../../../../components/block/block';
import { Button } from '../../../../components/button/button';
import { useUser } from "../../../../hooks/useUser";
import { useModal } from "../../../../hooks/useModal"
import { AddTaskModal } from '../../../../components/modal/modal';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function AgendaBlock() {
  const calendarRef = useRef(null);

  const { activeModal, openModal, closeModal } = useModal();
  const { user } = useUser();
  const userId = user?.idUser;



  const [view, setView] = useState('dayGridMonth');
  const [currentDate, setDate] = useState(new Date());

  // Fetch tasks via useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ['taches', userId],
    queryFn: async () => {
      const res = await fetch(`${VITE_API_URL}/getTaches/${userId}`);
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    enabled: !!userId
  });



  // Sync view and date on calendar when state changes
  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.gotoDate(currentDate);
      api.changeView(view);
    }
  }, [view, currentDate]);

  // Display loader or error
  if (isLoading) return <p>Chargement des tâches…</p>;
  if (error) return <p>Erreur lors du chargement : {error.message}</p>;

  const todos = data || [];



  // Map tasks to FullCalendar events including multi-day spans
  const events = todos.map(t => ({
    id: t.idTache.toString(),
    title: t.tacheName,
    start: t.tacheStart,
    end: t.tacheEnd,
  }));

  // Handle clicking a date in month view
  const onDateClick = info => {
    setDate(info.date);
    setView('listDay');
  };

  const toggleBtnStyle = { aspectRatio: 1, borderRadius: '50%', padding: 0 };

  return (
    <Block blockName="agenda">
      <div className="agenda-inner">
        <div className="calendarContainer">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
            initialView={view}
            initialDate={currentDate}
            headerToolbar={false}
            events={events}
            height="100%"
            dateClick={onDateClick}
          />
        </div>
        <div className="toggleContainer">
          <Button
            style={toggleBtnStyle}
            description="Vue Mois"
            text="Mois"
            onClick={() => setView('dayGridMonth')}
            variant={view === 'dayGridMonth' ? 'active' : 'primary'}
          />
          <Button
            style={toggleBtnStyle}
            description="Vue Jour"
            text="Jour"
            onClick={() => setView('listDay')}
            variant={view === 'listDay' ? 'active' : 'primary'}
          />
          <Button
            style={toggleBtnStyle}
            description="Ajouter une tâche"
            icon="/icones/meta/plus.webp"
            onClick={() => openModal("addTask")}
            variant="primary"
          />
          <AddTaskModal isOpen={activeModal === "addTask"} onClose={closeModal} />
          
        </div>
      </div>
    </Block>
  );
}
