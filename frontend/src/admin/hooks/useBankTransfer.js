import { useContext } from 'react';
import { BankTransferContext } from '../context/BankTransferContext';

const useBankTransfer = () => {
    const context = useContext(BankTransferContext);

    if (!context) {
        throw new Error('useBankTransfer must be used within a BankTransferProvider');
    }

    return context;
};

export default useBankTransfer;
