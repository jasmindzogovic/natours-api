const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ mesage: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// GET specific tours by id
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'That tour id does not exist',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// POST new tours
app.post('/api/v1/tours', (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// PATCH
app.patch('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

// DELETE
app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
