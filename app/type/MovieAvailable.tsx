export default interface RoundDetail {
    timeString: string,
    seat_available: Record<string, boolean>[];
    movie_id: string;
    movie_date: string;
}

export interface SeatDetail {

}