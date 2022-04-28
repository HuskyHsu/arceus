import { useContext } from "react";
import clsx from "clsx";

import { Icon } from "@/components";
import { zeroFilled } from "@/utils";
import { Display } from "@/models";
import { PokemonContext } from "../Detail";

interface ButtonProps {
  children: JSX.Element;
  status: boolean;
  onClick: Function;
}

interface DisplayProps {
  display: Display;
  taggleShiny: Function;
  taggleGender: Function;
}

function Button({ children, status, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full p-2",
        status ? "bg-slate-600" : "bg-slate-200"
      )}
      onClick={() => {
        onClick();
      }}>
      {children}
    </button>
  );
}

function GenderButton({ display, taggleGender }: DisplayProps) {
  const pokemon = useContext(PokemonContext);
  return (
    <>
      <Button
        onClick={() => taggleGender("male")}
        status={display.selectGender === "male"}>
        <Icon.Male
          className={clsx(
            "h-6 w-6",
            display.selectGender === "male"
              ? "fill-slate-200"
              : "fill-slate-600"
          )}
        />
      </Button>
      <Button
        onClick={() => taggleGender("female")}
        status={display.selectGender === "female"}>
        <Icon.Female
          className={clsx(
            "h-6 w-6",
            display.selectGender === "female"
              ? "fill-slate-200"
              : "fill-slate-600"
          )}
        />
      </Button>
    </>
  );
}

function DisplayImage({ display, taggleShiny, taggleGender }: DisplayProps) {
  const pokemon = useContext(PokemonContext);

  const getShowUrl = () => {
    if (display.selectGender === "same") {
      return display.shiny ? pokemon.imgPath.s_s : pokemon.imgPath.s;
    }
    if (display.selectGender === "male") {
      return display.shiny ? pokemon.imgPath.m_s : pokemon.imgPath.m;
    }
    return display.shiny ? pokemon.imgPath.f_s : pokemon.imgPath.f;
  };

  return (
    <>
      <div className="w-3/5 h-60 md:w-max md:-ml-72 z-10 flex justify-center items-center">
        <img src={getShowUrl()} alt="" />
      </div>
      <ul className="absolute right-6 md:right-20 z-20">
        <li className="flex flex-col gap-2">
          <Button onClick={taggleShiny} status={display.shiny}>
            <Icon.Shiny
              className={clsx(
                "h-6 w-6",
                display.shiny ? "fill-slate-200" : "fill-slate-600"
              )}
            />
          </Button>
          {pokemon.genderDiff && (
            <GenderButton
              display={display}
              taggleShiny={() => {}}
              taggleGender={taggleGender}
            />
          )}
        </li>
      </ul>
    </>
  );
}

function IdString() {
  const pokemon = useContext(PokemonContext);
  return (
    <span className="hidden md:block absolute bottom-4 right-4 text-white text-7xl">
      #{zeroFilled(pokemon.id)}
    </span>
  );
}

export function Hero({ display, taggleShiny, taggleGender }: DisplayProps) {
  return (
    <>
      <DisplayImage
        display={display}
        taggleShiny={taggleShiny}
        taggleGender={taggleGender}
      />
      <IdString />
    </>
  );
}
