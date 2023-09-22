// export class CustomError extends Error {
//     constructor(
//         public name: string,
//         public message: string,
//         public status: number
//     ) {
//         super();
//     }
// };

export class CustomError {
    constructor(
        public name: string,
        public message: string,
        public status: number
    ) {};
};