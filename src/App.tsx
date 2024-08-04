import React from 'react';
import {GameBoard} from "./components/GameBoard";
import './App.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

function App() {
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode:'dark',
                },
            }),
        []
    );
    theme.spacing(16)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <header className="App-header">
                    <GameBoard/>

                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
