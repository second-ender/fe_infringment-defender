import { type AxiosResponse } from 'axios'
import api from '../api/apiClient'
import type { Conversation } from '@/models/interfaces/chatHistory';


class ConsultService {
    async getHistory(): Promise<AxiosResponse<Conversation[]>> {
        console.log("vamos a consumir");
        // si existe la paginacion, la guardo en el local storage
         let currentPage = localStorage.getItem('currentPage');
         let pageSize = localStorage.getItem('pageSize');
         if (currentPage && pageSize) {
             localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
             localStorage.setItem('pageSize', pageSize);
         }else {
            currentPage = '1';
            pageSize = '10';
            localStorage.setItem('currentPage', (parseInt(currentPage)+1).toString());
            localStorage.setItem('pageSize', pageSize);
        }

        const response: AxiosResponse<Conversation[]> = await api.get(
            `/conversations/history`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        console.log('response in service :: ', response);
        return response;
    }
}
export const consultService = new ConsultService();

