package core

type CarbonIntensityError struct {
	IsCarbonIntensityError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCarbonIntensityError(code string, msg string, ctx *Context) *CarbonIntensityError {
	return &CarbonIntensityError{
		IsCarbonIntensityError: true,
		Sdk:              "CarbonIntensity",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CarbonIntensityError) Error() string {
	return e.Msg
}
