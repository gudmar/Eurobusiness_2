Game
    const generateNextState: func = useGameManager()

    CommandArea
        Indicators
            PlayerBlue // Hooks are for connecting player singletons 
                    // to  react
                $
                NrSepcialCards
                PreciseReport (button opens a modal)  (INFO)
                    (Presents: Name, Country -> City -> isMortaged, nrHouses, nrHotels)
            PlayerRed $
                $
                NrSepcialCards
                PreciseReport (button opens a modal) (INFO)
            PlayerGreen $
                $
                NrSepcialCards
                PreciseReport (button opens a modal)  (INFO)
            PlayerYellow $
                $ 
                NrSepcialCards
                PreciseReport (button opens a modal)  (INFO)
            RoundNumber
    Board
        MiddleBoard
            Chances (blue)  (INFO)
            Chances (red)    (INFO)
        Side(bottom)
            Field  (INFO) ( Raport shape:
                Country (set)
                City (name)
                Price
                Mortage gain
                House cost
                Hotel cost
                Player stay cost
            )
            Field  (INFO)
            ...


        Side(left)
        Side(top)
        Side(right)

    Players
        PlayerBlue
        PlayerRed
        PleyerYellow
        PlayerGreen

    StartScreen (uses Information to select players...)

    Information (A modal taking a component to display)






=====================
/*  (INFO) Component displays information in 'Information' component