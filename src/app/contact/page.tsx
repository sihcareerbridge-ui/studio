
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
import { useUserRole, UserRoleProvider } from '@/hooks/use-user-role';
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
    
    const [selectedHost, setSelectedHost] = useState(initialHost || (role === 'admin' ? null : allHosts[0]));
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState<Conversations>(allConversations);
    const [newMessage, setNewMessage] = useState('');

    const filteredHosts = useMemo(() => {
        if (role === 'host') return [];
        return allHosts.filter(host => host.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, role]);
    
    const currentConversation = useMemo(() => {
        let hostId: string | undefined;
        if (role === 'host') {
            // For a host user, we'll use a hardcoded ID for the demo conversation with admin.
            hostId = 'host-06';
        } else if (selectedHost) {
            hostId = selectedHost.id;
        }
        
        if (hostId) {
            return conversations[hostId] || [];
        }
        return [];
    }, [selectedHost, conversations, role]);


    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
    
        let targetHostId: string | undefined;
        if (role === 'admin' && selectedHost) {
            targetHostId = selectedHost.id;
        } else if (role === 'host') {
            // Hardcoded demo host ID for host-to-admin messages
            targetHostId = 'host-06';
        }

        if (!targetHostId) return;

        const message: Conversation = {
            from: role,
            text: newMessage,
            timestamp: 'Just now',
        };

        setConversations(prev => ({
            ...prev,
            [targetHostId!]: [...(prev[targetHostId!] || []), message]
        }));
        setNewMessage('');
    };

    const getBackButtonLink = () => {
        switch (role) {
            case 'admin': return '/admin';
            case 'host': return '/host';
            default: return '/';
        }
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-4">
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href={getBackButtonLink()}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Link>
                </Button>
            </div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Contact Center</h1>
                <p className="text-muted-foreground">{role === 'admin' ? 'Communicate with host organizations.' : 'Communicate with platform admin support.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-18rem)]">
                {/* Contact List */}
                 <div className={cn("md:col-span-1", role === 'host' ? 'hidden md:block' : 'block', selectedHost && role === 'admin' && 'hidden md:block')}>
                    <Card className="flex flex-col h-full">
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
                        <CardContent className="p-0 flex-1">
                            <ScrollArea className="h-full">
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
                                    <div className="flex items-center gap-3 p-3 text-left w-full bg-secondary">
                                        <Avatar className="h-10 w-10 border-2 border-primary">
                                            <AvatarFallback><Headset/></AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">Admin Support</p>
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                 </div>

                {/* Chat Window */}
                <div className={cn("md:col-span-3", role === 'admin' && !selectedHost ? 'block' : '', role === 'admin' && selectedHost ? 'block' : '', role === 'host' ? 'md:col-span-3' : 'hidden md:block')}>
                    <Card className="flex flex-col h-full">
                        { (role === 'admin' && !selectedHost) ? (
                             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <Headset className="h-16 w-16 mb-4" />
                                <h2 className="text-xl font-semibold">Select a conversation</h2>
                                <p>Choose a host from the list to start messaging.</p>
                            </div>
                        ) : (
                            <>
                                <CardHeader className="border-b">
                                    <div className="flex items-center gap-3">
                                        {role === 'admin' && (
                                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedHost(null)}><ChevronLeft/></Button>
                                        )}
                                        <Avatar className="h-10 w-10">
                                            {role === 'admin' && selectedHost ? (
                                                <>
                                                 <AvatarImage src={selectedHost?.logoUrl} alt={selectedHost?.name} />
                                                 <AvatarFallback>{selectedHost?.name.charAt(0)}</AvatarFallback>
                                                </>
                                            ) : (
                                                <AvatarFallback><Headset/></AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-lg">{role === 'admin' ? selectedHost?.name : 'Admin Support'}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                                {currentConversation.map((msg, index) => (
                                        <div key={index} className={cn("flex items-end gap-2", msg.from === role ? "justify-end" : "justify-start")}>
                                            {msg.from !== role && (
                                                 <Avatar className="h-8 w-8">
                                                    {role === 'admin' ? (
                                                         <>
                                                          <AvatarImage src={selectedHost?.logoUrl}/>
                                                          <AvatarFallback>{selectedHost?.name.charAt(0)}</AvatarFallback>
                                                         </>
                                                    ) : (
                                                        <AvatarFallback><Headset/></AvatarFallback>
                                                    )}
                                                </Avatar>
                                            )}
                                            <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.from === role ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                                            </div>
                                            {msg.from === role && <Avatar className="h-8 w-8"><AvatarImage /><AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback></Avatar>}
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
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <UserRoleProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <ContactPageContent />
            </Suspense>
        </UserRoleProvider>
    )
}
