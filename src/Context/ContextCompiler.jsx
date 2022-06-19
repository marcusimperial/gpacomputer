import StateContext from "./StateContext";
import FunctionsContext from "./EventContext";
import ComputeContext from "./ComputeContext";

const ContextCompiler = ({ children }) => {
    return (
        <StateContext>
            <FunctionsContext>
                <ComputeContext>
                    {children}
                </ComputeContext>
            </FunctionsContext>
        </StateContext>
    )
}

export default ContextCompiler;