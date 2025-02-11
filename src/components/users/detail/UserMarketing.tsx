import { motion } from 'framer-motion';
import { UserDetail } from '@/types/userDetail';
import { Target, Globe, Clock, Monitor, MapPin } from 'lucide-react';

interface UserMarketingProps {
    user: UserDetail;
}

export default function UserMarketing({ user }: UserMarketingProps) {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Marketing Information</h2>

            {/* UTM Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {user.utm_source && (
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Target className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-purple-900">Source</span>
                        </div>
                        <p className="text-purple-700">{user.utm_source}</p>
                    </div>
                )}
                {user.utm_medium && (
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Globe className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-900">Medium</span>
                        </div>
                        <p className="text-blue-700">{user.utm_medium}</p>
                    </div>
                )}
                {user.utm_campaign && (
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <Target className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-900">Content</span>
                        </div>
                        <p className="text-green-700">{user.utm_content}</p>
                    </div>
                )}
            </div>

            {/* Metadata Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center mb-2">
                            <Clock className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Sign Up Time</span>
                        </div>
                        <p className="text-gray-600">{formatDate(user.metadata?.signup_timestamp)}</p>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <Monitor className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">User Agent</span>
                        </div>
                        <p className="text-gray-600 text-sm">{user.metadata?.user_agent || 'N/A'}</p>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Source IP</span>
                        </div>
                        <p className="text-gray-600">{user.metadata?.source_ip || 'N/A'}</p>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <Globe className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700">Registration URL</span>
                        </div>
                        <p className="text-gray-600 text-sm truncate" title={user.metadata?.url}>
                            {user.metadata?.url || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
