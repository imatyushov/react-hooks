const properties = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const initialProps = properties.reduce((acc, current) => {
     acc[current] = Math.random();
     return acc;
}, {})

export function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function updateRandomProp(props) {
     const newProps = {...props};
     const propToUpdate = properties[getRandomInt(0, properties.length - 1)];
     newProps[propToUpdate] = Math.random();

     return newProps;
}