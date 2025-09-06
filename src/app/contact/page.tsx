
'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allHosts, conversations as allConversations } from '@/lib/demo-data';
import { Send, Search, Headset, ChevronLeft, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserRole } from '@/hooks/use-user-role';
import Link from 'next/link';

type Conversation = {
    from: 'admin' | 'host';
    text: string;
    timestamp: string;
};

type Conversations = Record<string, Conversation[]>;


function ContactPageContent() {
    const searchParams = useSearchParams();
    const { role } = useUserRole();

    const initialHostName = searchParams.get('host');
    const initialHost = allHosts.find(h => h.name === initialHostName);
    
    const [selectedHost, setSelectedHost] = useState(initialHost || (role === 'admin' ? allHosts[0] : null));
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState<Conversations>(allConversations);
    const [newMessage, setNewMessage] = useState('');

    const filteredHosts = useMemo(() => {
        return allHosts.filter(host => host.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);
    
    const currentConversation = useMemo(() => {
        if (role === 'host') {
            // A host can only see their conversation with admin. Let's find their host entry.
            // For demo, we'll hardcode to the first host with a conversation.
             const hostId = Object.keys(conversations)[2]; // host-06
            return conversations[hostId] || [];
        }
        return selectedHost ? conversations[allHosts.findIndex(h => h.id === selectedHost.id) + 1] || [] : [];
    }, [selectedHost, conversations, role]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '' || (role === 'admin' && !selectedHost)) return;

        const message: Conversation = {
            from: role === 'admin' ? 'admin' : 'host',
            text: newMessage,
            timestamp: 'Just now',
        };
        
        let targetHostId: string;
        if(role === 'admin' && selectedHost) {
            targetHostId = allHosts.find(h => h.id === selectedHost.id)!.id;
        } else {
             targetHostId = 'host-06'; // demo host
        }

        setConversations(prev => ({
            ...prev,
            [targetHostId]: [...(prev[targetHostId] || []), message]
        }));
        setNewMessage('');
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Contact Center</h1>
                <p className="text-muted-foreground">Communicate with hosts or admin support.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
                {/* Contact List */}
                <Card className={cn("md:col-span-1", (role === 'host' && 'hidden md:block'))}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           {role === 'admin' ? <Building/> : <Headset/> }
                           <span>{role === 'admin' ? 'Organizations' : 'Support'}</span>
                        </CardTitle>
                        {role === 'admin' && (
                             <div className="relative pt-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search hosts..." 
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-20rem)]">
                            {role === 'admin' ? (
                                filteredHosts.map(host => (
                                <button
                                    key={host.id}
                                    onClick={() => setSelectedHost(host)}
                                    className={cn(
                                    'flex items-center gap-3 p-3 text-left w-full hover:bg-secondary',
                                    selectedHost?.id === host.id && 'bg-secondary'
                                    )}
                                >
                                    <Avatar className="h-10 w-10">
                                    <AvatarImage src={host.logoUrl} alt={host.name} />
                                    <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{host.name}</p>
                                    </div>
                                </button>
                                ))
                            ) : (
                                <button className="flex items-center gap-3 p-3 text-left w-full bg-secondary">
                                    <Avatar className="h-10 w-10 border-2 border-primary">
                                        <AvatarFallback><Headset/></AvatarFallback>
                                    </Avatar>
                                     <p className="font-semibold">Admin Support</p>
                                </button>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Chat Window */}
                <Card className="md:col-span-3 flex flex-col">
                    {selectedHost || role === 'host' ? (
                         <>
                            <CardHeader className="border-b">
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedHost(null)}><ChevronLeft/></Button>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={selectedHost?.logoUrl} alt={selectedHost?.name} />
                                        <AvatarFallback>{selectedHost?.name.charAt(0) || 'S'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-lg">{selectedHost?.name || 'Admin Support'}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                               {currentConversation.map((msg, index) => (
                                    <div key={index} className={cn("flex items-end gap-2", msg.from === role ? "justify-end" : "justify-start")}>
                                        {msg.from !== role && <Avatar className="h-8 w-8"><AvatarImage src={selectedHost?.logoUrl}/><AvatarFallback>{selectedHost?.name.charAt(0)}</AvatarFallback></Avatar>}
                                        <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.from === role ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                                        </div>
                                    </div>
                               ))}
                            </CardContent>
                            <div className="p-4 border-t">
                                <div className="relative">
                                    <Input 
                                        placeholder="Type your message..." 
                                        className="pr-16 h-12"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleSendMessage}>
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                         </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <Headset className="h-16 w-16 mb-4" />
                            <h2 className="text-xl font-semibold">Select a conversation</h2>
                            <p>Choose a host from the list to start messaging.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactPageContent />
        </Suspense>
    )
}
