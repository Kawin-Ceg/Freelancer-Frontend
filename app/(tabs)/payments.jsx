import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

// Placeholder data for payments
const paymentsData = [
  {
    id: 1,
    projectName: 'E-commerce Mobile App',
    amount: '$4,500',
    paymentMethod: 'Card',
    paymentMethodIcon: '💳',
    paymentDate: 'Dec 10, 2024',
    status: 'Completed',
    statusColor: 'text-green-500',
    statusBg: 'bg-green-50',
    client: 'TechCorp Inc',
    transactionId: 'TX-7842-2024'
  },
  {
    id: 2,
    projectName: 'Website Redesign',
    amount: '$2,800',
    paymentMethod: 'Bank Transfer',
    paymentMethodIcon: '🏦',
    paymentDate: 'Nov 28, 2024',
    status: 'Completed',
    statusColor: 'text-green-500',
    statusBg: 'bg-green-50',
    client: 'Design Studio Co',
    transactionId: 'TX-6591-2024'
  },
  {
    id: 3,
    projectName: 'API Integration Service',
    amount: '$1,500',
    paymentMethod: 'UPI',
    paymentMethodIcon: '📱',
    paymentDate: 'Jan 05, 2025',
    status: 'Pending',
    statusColor: 'text-yellow-500',
    statusBg: 'bg-yellow-50',
    client: 'StartupXYZ',
    transactionId: 'TX-9234-2025'
  },
  {
    id: 4,
    projectName: 'UI/UX Design System',
    amount: '$3,200',
    paymentMethod: 'Card',
    paymentMethodIcon: '💳',
    paymentDate: 'Dec 18, 2024',
    status: 'Completed',
    statusColor: 'text-green-500',
    statusBg: 'bg-green-50',
    client: 'Creative Agency',
    transactionId: 'TX-8123-2024'
  },
  {
    id: 5,
    projectName: 'Social Media Marketing',
    amount: '$1,800',
    paymentMethod: 'UPI',
    paymentMethodIcon: '📱',
    paymentDate: 'Dec 08, 2024',
    status: 'Failed',
    statusColor: 'text-red-500',
    statusBg: 'bg-red-50',
    client: 'Fashion Brand',
    transactionId: 'TX-7456-2024'
  },
  {
    id: 6,
    projectName: 'AI Chatbot Development',
    amount: '$6,000',
    paymentMethod: 'Bank Transfer',
    paymentMethodIcon: '🏦',
    paymentDate: 'Jan 15, 2025',
    status: 'Processing',
    statusColor: 'text-blue-500',
    statusBg: 'bg-blue-50',
    client: 'Innovation Labs',
    transactionId: 'TX-1345-2025'
  }
];

const paymentFilters = [
  { id: 'all', name: 'All Payments', count: paymentsData.length },
  { id: 'completed', name: 'Completed', count: paymentsData.filter(p => p.status === 'Completed').length },
  { id: 'pending', name: 'Pending', count: paymentsData.filter(p => p.status === 'Pending').length },
  { id: 'processing', name: 'Processing', count: paymentsData.filter(p => p.status === 'Processing').length },
  { id: 'failed', name: 'Failed', count: paymentsData.filter(p => p.status === 'Failed').length }
];

const PaymentCard = ({ payment }) => (
  <StyledView className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-gray-100">
    {/* Header with Project and Amount */}
    <StyledView className="flex-row justify-between items-start mb-4">
      <StyledView className="flex-1">
        <StyledText className="text-lg font-bold text-gray-800 mb-1">
          {payment.projectName}
        </StyledText>
        <StyledText className="text-gray-500 text-sm">
          {payment.client}
        </StyledText>
      </StyledView>
      <StyledView className="items-end">
        <StyledText className="text-2xl font-bold text-gray-800 mb-1">
          {payment.amount}
        </StyledText>
        <StyledView className={`px-3 py-1 rounded-full ${payment.statusBg}`}>
          <StyledText className={`text-xs font-semibold ${payment.statusColor}`}>
            {payment.status}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>

    {/* Payment Details */}
    <StyledView className="flex-row justify-between items-center mb-4 py-3 border-t border-b border-gray-100">
      <StyledView className="flex-row items-center">
        <StyledText className="text-xl mr-2">{payment.paymentMethodIcon}</StyledText>
        <StyledView>
          <StyledText className="text-gray-500 text-xs mb-1">Payment Method</StyledText>
          <StyledText className="text-gray-800 font-semibold text-sm">
            {payment.paymentMethod}
          </StyledText>
        </StyledView>
      </StyledView>
      
      <StyledView className="items-end">
        <StyledText className="text-gray-500 text-xs mb-1">Payment Date</StyledText>
        <StyledText className="text-gray-800 font-semibold text-sm">
          {payment.paymentDate}
        </StyledText>
      </StyledView>
    </StyledView>

    {/* Footer with Transaction ID and Actions */}
    <StyledView className="flex-row justify-between items-center">
      <StyledView>
        <StyledText className="text-gray-500 text-xs mb-1">Transaction ID</StyledText>
        <StyledText className="text-gray-600 text-sm font-medium">
          {payment.transactionId}
        </StyledText>
      </StyledView>
      
      <StyledView className="flex-row space-x-2">
        <StyledTouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
          <StyledText className="text-gray-700 font-medium text-sm">Details</StyledText>
        </StyledTouchableOpacity>
        {payment.status === 'Completed' && (
          <StyledTouchableOpacity className="bg-purple-600 px-4 py-2 rounded-lg">
            <StyledText className="text-white font-medium text-sm">Invoice</StyledText>
          </StyledTouchableOpacity>
        )}
      </StyledView>
    </StyledView>
  </StyledView>
);

const SummaryCard = () => (
  <StyledView className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mx-6 mb-6 shadow-xl">
    <StyledView className="flex-row justify-between items-center">
      <StyledView>
        <StyledText className="text-white text-sm font-medium mb-1">Total Balance</StyledText>
        <StyledText className="text-white text-3xl font-bold">$18,450</StyledText>
        <StyledText className="text-purple-200 text-sm mt-1">+$2,450 this month</StyledText>
      </StyledView>
      <StyledView className="items-end">
        <StyledText className="text-white text-sm font-medium mb-2">Available</StyledText>
        <StyledText className="text-white text-2xl font-bold">$12,800</StyledText>
        <StyledText className="text-purple-200 text-sm">Pending: $5,650</StyledText>
      </StyledView>
    </StyledView>
  </StyledView>
);

const FilterButton = ({ filter, isActive, onPress }) => (
  <StyledTouchableOpacity 
    onPress={onPress}
    className={`px-4 py-3 rounded-xl mr-3 flex-row items-center ${
      isActive ? 'bg-purple-600' : 'bg-gray-100'
    }`}
  >
    <StyledText className={`font-semibold text-sm ${
      isActive ? 'text-white' : 'text-gray-700'
    }`}>
      {filter.name}
    </StyledText>
    <StyledView className={`ml-2 px-2 py-1 rounded-full ${
      isActive ? 'bg-white' : 'bg-gray-200'
    }`}>
      <StyledText className={`text-xs font-bold ${
        isActive ? 'text-purple-600' : 'text-gray-600'
      }`}>
        {filter.count}
      </StyledText>
    </StyledView>
  </StyledTouchableOpacity>
);

export default function PaymentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [payments] = useState(paymentsData);

  const filteredPayments = payments.filter(payment => {
    if (selectedFilter === 'all') return true;
    return payment.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount.replace('$', '').replace(',', ''));
    return sum + amount;
  }, 0);

  return (
    <StyledView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
      
      <StyledScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <StyledView className="bg-purple-600 pt-12 pb-6 px-6">
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledView>
              <StyledText className="text-2xl font-bold text-white">
                Payments
              </StyledText>
              <StyledText className="text-purple-200 mt-1">
                Manage your earnings and transactions
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity className="bg-white/20 w-10 h-10 rounded-full items-center justify-center">
              <StyledText className="text-white font-bold text-lg">⚡</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Summary Card */}
        <StyledView className="-mt-4">
          <SummaryCard />
        </StyledView>

        {/* Status Filters */}
        <StyledView className="px-6 py-4 bg-white border-b border-gray-200">
          <StyledScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {paymentFilters.map((filter) => (
              <FilterButton
                key={filter.id}
                filter={filter}
                isActive={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
              />
            ))}
          </StyledScrollView>
        </StyledView>

        {/* Results Count and Total */}
        <StyledView className="px-6 pt-6 pb-4 flex-row justify-between items-center">
          <StyledText className="text-gray-600">
            {filteredPayments.length} transactions
          </StyledText>
          <StyledText className="text-gray-800 font-semibold">
            Total: ${totalAmount.toLocaleString()}
          </StyledText>
        </StyledView>

        {/* Payments List */}
        <StyledView className="px-6">
          {filteredPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </StyledView>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <StyledView className="flex-1 items-center justify-center py-20 px-6">
            <StyledText className="text-6xl mb-4">💸</StyledText>
            <StyledText className="text-xl font-bold text-gray-800 mb-2 text-center">
              No payments found
            </StyledText>
            <StyledText className="text-gray-500 text-center mb-6">
              There are no payments matching your current filter
            </StyledText>
            <StyledTouchableOpacity 
              className="bg-purple-600 px-6 py-3 rounded-xl"
              onPress={() => setSelectedFilter('all')}
            >
              <StyledText className="text-white font-semibold">
                View All Payments
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}
      </StyledScrollView>

      {/* Floating Action Button */}
      <StyledTouchableOpacity className="absolute bottom-6 right-6 bg-purple-600 w-16 h-16 rounded-full items-center justify-center shadow-xl">
        <StyledText className="text-white text-2xl font-bold">+</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
}