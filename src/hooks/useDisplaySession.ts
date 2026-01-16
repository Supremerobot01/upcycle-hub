import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface DisplayState {
  categoryIndex?: number;
  action?: string;
}

export function useDisplaySession() {
  const [currentState, setCurrentState] = useState<DisplayState>({});
  const [isControlled, setIsControlled] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const displayChannel = supabase.channel('display-control', {
      config: { presence: { key: 'display' } }
    });

    displayChannel
      .on('broadcast', { event: 'control' }, ({ payload }) => {
        setCurrentState(payload);
        setIsControlled(true);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = displayChannel.presenceState();
        setIsControlled(Object.keys(state).length > 1);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await displayChannel.track({ role: 'display' });
        }
      });

    setChannel(displayChannel);

    return () => {
      displayChannel.unsubscribe();
    };
  }, []);

  return { currentState, isControlled, channel };
}

export function useRemoteController() {
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    const remoteChannel = supabase.channel('display-control', {
      config: { presence: { key: 'remote' } }
    });

    remoteChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await remoteChannel.track({ role: 'remote' });
        setIsConnected(true);
      }
    });

    setChannel(remoteChannel);

    return () => {
      remoteChannel.unsubscribe();
    };
  }, []);

  const sendControl = (state: DisplayState) => {
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'control',
        payload: state,
      });
    }
  };

  return { isConnected, sendControl };
}
