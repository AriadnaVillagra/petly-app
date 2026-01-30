import { FlatList, Text, View, Button } from 'react-native';
import { BookingDTO } from '../../application/dto/BookingDTO';

interface Props {
    bookings: BookingDTO[];
    onConfirm?: (id: string) => void;
    onCancel?: (id: string) => void;
}

export const BookingList = ({
    bookings,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <FlatList
            data={bookings}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 12, borderBottomWidth: 1 }}>
                    <Text>🐶 Pet: {item.petId}</Text>
                    <Text>🛁 Servicio: {item.serviceName}</Text>
                    <Text>📅 Fecha: {item.date}</Text>
                    <Text>⏰ Hora: {item.time}</Text>
                    <Text>💰 ${item.price}</Text>
                    <Text>📌 Estado: {item.status}</Text>

                    {item.status === 'PENDING' && onConfirm && (
                        <Button
                            title="Confirmar"
                            onPress={() => onConfirm(item.id)}
                        />
                    )}

                    {item.status !== 'CANCELLED' && onCancel && (
                        <Button
                            title="Cancelar"
                            color="red"
                            onPress={() => onCancel(item.id)}
                        />
                    )}
                </View>
            )}
        />
    );
};
