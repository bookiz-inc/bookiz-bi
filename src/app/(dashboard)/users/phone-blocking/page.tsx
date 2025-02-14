import { PhoneBlockingManagement } from "@/components/users/phone-blocking/PhoneBlockingManagement";

export const metadata = {
    title: 'Phone Number Blocking Management - Bookiz',
    description: 'Manage blocked phone numbers in the Bookiz system',
};

export default function PhoneBlockingPage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Phone Number Blocking</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Manage blocked phone numbers to prevent unwanted access to the system.
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <PhoneBlockingManagement />
            </div>
        </div>
    );
} 