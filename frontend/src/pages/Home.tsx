import React, { useEffect, useState } from "react";
import { Book } from "../models/BookModel";
import { useLoaderData } from "react-router-dom";
import Carousel from "../Components/Carousel";

const Home: React.FC = () => {
  const loaderData = useLoaderData() as {
    discountBooks: Book[];
    newestBooks: Book[];
  };
  const { discountBooks, newestBooks } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <div className="mb-8">
        <p className="text-2xl">Most Discounted</p>
      </div>
      <Carousel books={discountBooks} />
      <div className="mt-8 mb-8">
        <p className="text-2xl">Newest</p>
      </div>
      <Carousel books={newestBooks} />

    </div>

  );
};

export default Home;


export const homeLoader = async () => {
  // fetching 10 most discounted books
  const discountBooksResponse = await fetch('http://localhost:3000/books?sort=discount&sortOrder=desc&limit=10');

  if (!discountBooksResponse.ok) {
    throw new Response('Failed to fetch discounted books', { status: discountBooksResponse.status });
  }
  const discountBooksData = await discountBooksResponse.json();

  //fetching 10 newest books
  const newestBooksResponse = await fetch('http://localhost:3000/books?sort=createdAt&sortOrder=desc&limit=10');

  if (!newestBooksResponse.ok) {
    throw new Response('Failed to fetch newest books', { status: newestBooksResponse.status });
  }
  const newestBooksData = await newestBooksResponse.json();

  return {
    discountBooks: discountBooksData.books,
    newestBooks: newestBooksData.books,
  };
}