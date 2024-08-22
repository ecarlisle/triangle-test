
import { useState, useEffect } from "react";
import Head from "next/head";
import parse from 'html-react-parser';

export default function Home()  {
  const [side1, setSide1] = useState("");
  const [side2, setSide2] = useState("");
  const [side3, setSide3] = useState("");
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [validationText, setValidationText] = useState("");
  const [validationClass, setValidationClass] = useState("");

  // Abstract triangle calculation into a reusable function.
  const isValidTriangle = (sides:number[]) => {
    if (
        sides[0] + sides[1] > sides[2] &&
        sides[1] + sides[2] > sides[0] &&
        sides[2] + sides[0] > sides[1]
    ) {
      return true;
    }
    return false;
  }

  // For fetches and API calls, this would usually be an async function.
  const handleValidateTriangle = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Disable fieldset during form processing.
    setFieldsDisabled(true);

    // Collect all form values.
    const sideEntries = [side1, side2, side3];

    // PLaceholder for values converted to numbers.
    const sideVals:number[] = [];

    // Validate all sides as number.
    sideEntries.map(side => { 
      const sideTest = parseInt(side);
      if (!isNaN(Number(sideTest))) {
        sideVals.push(sideTest);
      }
    });

    // Error reporting for field validation.
    if (sideVals.length !== sideEntries.length) {
      setValidationClass("error");
      setValidationText("<strong>Error:</strong> Please ensure all fields have valid numbers.");
      setFieldsDisabled(false);
      return;
    }

    // Check for valid triangle.
    if (isValidTriangle(sideVals)) {
      setValidationClass("success");
      setValidationText("Yes, you can create a triangle");
    } else {
      setValidationClass("error");
      setValidationText("Sorry, you cannot create a triangle");
    }

    setFieldsDisabled(false);
    return;
  };


  return (
    <>
      <Head>
        <title>Verify Sides of a Triangle</title>
        <meta name="description" content="Create a triangle in specifying the length of three sides." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <h1>Verify Sides of a Triangle</h1>  
      </header>  
      <main>
        <form>
          <fieldset disabled={fieldsDisabled}>
            <p>Please enter lengths for sides of a valid triangle. Each of the three sides must be a valid number.</p>
            <p>
              <strong>
                <em>

                </em>              
              </strong>
            </p>
            <div className="inputs">
              <label >
                Side 1:
                <input name="side1" value={side1} onChange={e => setSide1(e.target.value)} />
              </label>
              <label>
                Side 2:
                <input name="side2" value={side2} onChange={e => setSide2(e.target.value)} />
              </label>
                <label>
                  Side 3:
                <input name="side3" value={side3} onChange={e => setSide3(e.target.value)} />
              </label>
            </div>
            <p className={validationClass}>{parse(validationText)}</p>
            <button onClick={e => handleValidateTriangle(e)}>
              Verify Triangle
            </button>
          </fieldset>

        </form>

      </main>
    </>
  );
}
